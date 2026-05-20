"""Repository-relative path helpers."""

from pathlib import Path
from typing import Optional


def find_root(start: Optional[Path] = None) -> Path:
    """Return the nearest parent directory containing AGENTS.md."""
    path = (start or Path.cwd()).resolve()
    for current in [path, *path.parents]:
        if (current / "AGENTS.md").exists():
            return current
    raise FileNotFoundError("Could not find repository root containing AGENTS.md")


ROOT = find_root(Path(__file__))


def data_path(*parts: str) -> Path:
    """Return a path under data/."""
    return ROOT.joinpath("data", *parts)


def output_path(*parts: str) -> Path:
    """Return a path under output/."""
    return ROOT.joinpath("output", *parts)
