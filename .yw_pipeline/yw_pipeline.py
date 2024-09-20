from pathlib import Path

from youwol.app.environment import YouwolEnvironment
from youwol.app.routers.projects import (BrowserApp, BrowserAppGraphics,
                                         Execution, IPipelineFactory)
from youwol.pipelines.pipeline_raw_app import PipelineConfig, pipeline
from youwol.utils import Context, parse_json


class PipelineFactory(IPipelineFactory):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    async def get(self, _env: YouwolEnvironment, ctx: Context):
        config = PipelineConfig(
            target=BrowserApp(
                displayName="MecaFrac",
                execution=Execution(standalone=True),
                graphics=BrowserAppGraphics(
                    appIcon=icon(size_px='100%', border_radius='15%', icon_path=app_icon),
                    fileIcon={},
                    background={
                        "class": "h-100 w-100",
                        "style": {
                            "opacity": 0.3,
                            "background-image": app_icon,
                            "background-size": "cover",
                            "background-repeat": "no-repeat",
                            "background-position": "center center",
                            "filter": "drop-shadow(rgb(0, 0, 0) 1px 3px 5px)",
                        },
                    }
                ),
            ),
            with_tags=["javascript", "application", "npm", "react"],
        )
        return await pipeline(config=config, context=ctx)


folder_path = Path(__file__).parent.parent
pkg_json = parse_json(folder_path / "package.json")

assets_dir = f"/api/assets-gateway/raw/package/bWVjYS1mcmFj/{pkg_json['version']}/dist/img"
app_icon = f"url('{assets_dir}/MECAFRAC_LIGHT.svg')"


def icon(size_px: str, border_radius: str, icon_path: str, bg_size: str = "cover"):
    return {
        "style": {
            "width": f"{size_px}",
            "height": f"{size_px}",
            "background-image": icon_path,
            "background-size": bg_size,
            "background-repeat": "no-repeat",
            "background-position": "center center",
            "filter": "drop-shadow(rgb(0, 0, 0) 1px 3px 5px)",
            "border-radius": f"{border_radius}",
        }
    }
