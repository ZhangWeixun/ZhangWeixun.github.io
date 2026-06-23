from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class HdrAgentPortfolioPageTest(unittest.TestCase):
    def test_homepage_links_to_hdr_agent_project(self):
        index = (ROOT / "index.html").read_text(encoding="utf-8")

        self.assertIn('href="projects/hdr-agent.html"', index)
        self.assertIn("HDR Agent: AI Agent for Expert-Guided SDR-to-HDR Optimization", index)

    def test_hdr_agent_page_has_required_portfolio_sections(self):
        page_path = ROOT / "projects" / "hdr-agent.html"
        self.assertTrue(page_path.exists(), "projects/hdr-agent.html should exist")

        page = page_path.read_text(encoding="utf-8")
        required_content = [
            "HDR Agent: AI Agent for Expert-Guided SDR-to-HDR Optimization",
            "Agent Workflow",
            "Feature Extraction Pipeline",
            "Human-in-the-Loop Knowledge Workflow",
            "HDR Agent Demo",
            'src="imgs/hdr_agent/hdr-agent-show.mp4"',
            "Key Technologies",
        ]

        for text in required_content:
            with self.subTest(text=text):
                self.assertIn(text, page)

    def test_hdr_agent_page_embeds_demo_video(self):
        page = (ROOT / "projects" / "hdr-agent.html").read_text(encoding="utf-8")
        video_path = ROOT / "projects" / "imgs" / "hdr_agent" / "hdr-agent-show.mp4"

        self.assertTrue(video_path.exists(), "HDR Agent demo video should exist")
        self.assertIn("<video", page)
        self.assertIn('class="demo-video"', page)
        self.assertIn('type="video/mp4"', page)
        self.assertIn("controls", page)
        self.assertIn("playsinline", page)
        self.assertNotIn('type="video/quicktime"', page)
        self.assertNotIn("showcase-placeholder", page)
        self.assertNotIn("Reserved Showcase Areas", page)

    def test_hdr_agent_page_omits_removed_metric_strip(self):
        page = (ROOT / "projects" / "hdr-agent.html").read_text(encoding="utf-8")
        removed_metrics = [
            "Expert Correction Records",
            "Scene / Problem Types",
            "Video Feature Modules",
            "Perceptual Difference Signals",
        ]

        for text in removed_metrics:
            with self.subTest(text=text):
                self.assertNotIn(text, page)


if __name__ == "__main__":
    unittest.main()
