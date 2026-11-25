"""Build the downloadable OBS folder from this checkout."""
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

root = Path(__file__).resolve().parents[1]
site = root / "dist" if (root / "dist/index.html").is_file() else root
names = ["index.html", "stream.html", "setup.html", "questions.js", "rotation.js",
         "chat.js", "app.js", "scoreboard.js", "font.js", "setup.js", "style.css"]
files = [site / name for name in names] + sorted((site / "assets").glob("*"))
temporary = site / "zebes-obs.tmp"
with ZipFile(temporary, "w", ZIP_DEFLATED) as archive:
    for file in files:
        name = file.relative_to(site).as_posix()
        if name in ("index.html", "stream.html"):
            html = file.read_text(encoding="utf8")
            start = html.index('<a class="button primary" href="zebes-obs.zip"')
            end = html.index("</a>", start) + 4
            html = (html[:start] + html[end:]).replace("Download and extract the overlay folder.",
                                                       "Keep the extracted overlay files together.")
            archive.writestr(name, html)
        else:
            archive.write(file, name)
    archive.write(root / "LICENSE", "LICENSE")
with ZipFile(temporary) as archive:
    assert archive.testzip() is None
    assert len(archive.namelist()) == len(files) + 1
temporary.replace(site / "zebes-obs.zip")
