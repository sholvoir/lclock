from fastapi import FastAPI, Query
from pydantic import BaseModel
from datetime import datetime
from skyfield.api import load, Topos

app = FastAPI(title="Planet Position API")

# 加载行星星历文件（一次就行）
planets = load('de421.bsp')
earth = planets['earth']
planet_dict = {
    "Mercury": planets["mercury"],
    "Venus": planets["venus"],
    "Mars": planets["mars"],
    "Jupiter": planets["jupiter barycenter"],
    "Saturn": planets["saturn barycenter"],
    "Uranus": planets["uranus barycenter"],
    "Neptune": planets["neptune barycenter"],
}

ts = load.timescale()

class PlanetPosition(BaseModel):
    name: str
    altitude_deg: float
    azimuth_deg: float
    distance_au: float


@app.get("/planets", response_model=list[PlanetPosition])
def get_planets(
    lat: float = Query(..., description="纬度 (度, N 正 S 负)"),
    lon: float = Query(..., description="经度 (度, E 正 W 负)"),
    datetime_utc: str = Query(
        ..., description="UTC 时间 (格式: YYYY-MM-DDTHH:MM, 例如 2025-08-25T12:00)"
    ),
):
    # 解析时间
    dt = datetime.fromisoformat(datetime_utc)
    t = ts.utc(dt.year, dt.month, dt.day, dt.hour, dt.minute)

    # 设置观测位置
    observer = earth + Topos(latitude_degrees=lat, longitude_degrees=lon)

    results = []
    for name, planet in planet_dict.items():
        astrometric = observer.at(t).observe(planet)
        alt, az, distance = astrometric.apparent().altaz()

        results.append(
            PlanetPosition(
                name=name,
                altitude_deg=round(alt.degrees, 2),
                azimuth_deg=round(az.degrees, 2),
                distance_au=round(distance.au, 3),
            )
        )
    return results
