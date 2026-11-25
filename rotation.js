"use strict";

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

// The used prefix doubles as a history. Moving a requested card to the end of
// that prefix keeps all the other unseen questions available for automatic play.
class QuestionRotation {
  constructor(cards, saved) {
    this.cards = cards;
    const size = this.size = cards.length;
    const order = saved?.order;
    const valid = Array.isArray(order) && order.length > 0 && order.length <= size
      && Number.isInteger(saved.drawn) && saved.drawn >= 0 && saved.drawn <= order.length
      && order.every(id => Number.isInteger(id) && id >= 0 && id < order.length)
      && new Set(order).size === order.length;
    if (!valid) {
      this.order = [];
      this.drawn = 0;
      this.restart();
      return;
    }
    this.drawn = saved.drawn;
    this.order = order.slice();
    // Content updates append new question IDs. Keep the played prefix intact.
    if (order.length < size) {
      const unseen = order.slice(this.drawn);
      for (let id = order.length; id < size; id++) unseen.push(id);
      this.order = order.slice(0, this.drawn).concat(shuffleCards(unseen));
    }
  }
  restart() {
    const buffer = Math.floor(this.size / 4);
    const recent = new Set(this.order.slice(Math.max(0, this.drawn - buffer), this.drawn));
    const cards = shuffleCards(Array.from({length: this.size}, (_, id) => id));
    // Keep the closing quarter out of the opening quarter of the next pass.
    const opening = cards.filter(id => !recent.has(id)).slice(0, buffer);
    const first = new Set(opening);
    const order = opening.concat(shuffleCards(cards.filter(id => !first.has(id))));
    const history = this.order.slice(Math.max(0, this.drawn - 3), this.drawn);
    for (let i = 0; i < order.length; i++) {
      // Stay within the protected opening. Prefer a different category and
      // space out cards drawn from the same fight, room guide or race notes.
      const end = i < buffer ? buffer : order.length;
      const last = this.cards[history.at(-1)];
      const recentSources = history.map(id => this.cards[id].source);
      for (let j = i; j < end; j++) {
        const candidate = this.cards[order[j]];
        if (candidate.category !== last?.category && !recentSources.includes(candidate.source)) {
          [order[i], order[j]] = [order[j], order[i]];
          break;
        }
      }
      history.push(order[i]);
      if (history.length > 3) history.shift();
    }
    this.order = order;
    this.drawn = 0;
  }
  next(loop) {
    if (this.drawn === this.size) {
      if (!loop) return null;
      this.restart();
    }
    return this.order[this.drawn++];
  }
  cue(id) {
    const at = this.order.indexOf(id, this.drawn);
    if (at >= 0) {
      this.order.splice(at, 1);
      this.order.splice(this.drawn++, 0, id);
    }
    return id;
  }
  get upcoming() {
    return this.order.slice(this.drawn, this.drawn + 3);
  }
}
