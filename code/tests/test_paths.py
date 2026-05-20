from metforge.paths import ROOT, data_path, output_path


def _is_relative_to(path, root):
    try:
        path.relative_to(root)
        return True
    except ValueError:
        return False


def test_root_contains_agents():
    assert (ROOT / "AGENTS.md").exists()


def test_repo_relative_helpers():
    assert _is_relative_to(data_path("raw"), ROOT)
    assert _is_relative_to(output_path("figures"), ROOT)
