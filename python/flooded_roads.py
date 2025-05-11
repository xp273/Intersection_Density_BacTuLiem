import psycopg2
import matplotlib.pyplot as plt
import pandas as pd
import os
import base64
from io import BytesIO

# Ensure the subfolder exists
output_folder = "python/output"
os.makedirs(output_folder, exist_ok=True)

def fetch_data(query):
    """Fetch data from the database using the given query."""
    conn = psycopg2.connect(dbname="Road_analysis",
        user="postgres",
        password="xuanphat0327",
        host="localhost",
        port="5432")
    cur = conn.cursor()
    cur.execute(query)
    data = cur.fetchall()
    conn.close()
    return data

# Queries to count the number of roads per district
roads_query = """
    SELECT districts_bactuliem."NAME_3", COUNT(roads_bactuliem.id) 
    FROM districts_bactuliem
    JOIN "roads_bactuliem" ON ST_Intersects(districts_bactuliem.geom, roads_bactuliem.geom) 
    GROUP BY districts_bactuliem."NAME_3";
"""

flooded_queries = {
    "Flooded 10m": """
        SELECT districts_bactuliem."NAME_3", COUNT(flooded_road_bactuliem_10m.id) 
        FROM districts_bactuliem 
        JOIN flooded_road_bactuliem_10m ON ST_Intersects(districts_bactuliem.geom, flooded_road_bactuliem_10m.geom) 
        GROUP BY districts_bactuliem."NAME_3";
    """,
    "Flooded 15m": """
        SELECT districts_bactuliem."NAME_3", COUNT(flooded_road_bactuliem_15m.id) 
        FROM districts_bactuliem 
        JOIN flooded_road_bactuliem_15m ON ST_Intersects(districts_bactuliem.geom, flooded_road_bactuliem_15m.geom) 
        GROUP BY districts_bactuliem."NAME_3";
    """,
    "Flooded 20m": """
        SELECT districts_bactuliem."NAME_3", COUNT(flooded_road_bactuliem_20m.id) 
        FROM districts_bactuliem 
        JOIN flooded_road_bactuliem_20m ON ST_Intersects(districts_bactuliem.geom, flooded_road_bactuliem_20m.geom) 
        GROUP BY districts_bactuliem."NAME_3";
    """
}

# Fetch data
roads_data = fetch_data(roads_query)
flooded_data = {label: fetch_data(query) for label, query in flooded_queries.items()}

# Convert to Pandas DataFrame
df_roads = pd.DataFrame(roads_data, columns=["District", "Total Roads"])
df_flooded = {label: pd.DataFrame(data, columns=["District", "Flooded Roads"]) for label, data in flooded_data.items()}
# print(df_flooded)

# Merge data
df = df_roads.copy()
for label, df_flood in df_flooded.items():
    df = df.merge(df_flood, on="District", how="left")

df.fillna(0, inplace=True)  # Replace NaN values with 0

# Plot the data
custom_colors = ["blue", "green", "orange", "red"] 
fig, ax = plt.subplots(figsize=(12, 6))
df.set_index("District").plot(kind="bar", ax=ax, width=0.9, color=custom_colors) 

# Add data labels (counters) on top of each bar
for i, bar in enumerate(ax.patches):
    ax.annotate(
        f"{bar.get_height():.0f}",  # Format to avoid decimals
        (bar.get_x() + bar.get_width() / 2, bar.get_height()), 
        ha="center", va="bottom", fontsize=10, color="black"
    )

ax.set_title("Number of Roads & Flooded Roads per District")
ax.set_ylabel("Count")
ax.set_xlabel("Districts")
plt.xticks(rotation=45)
plt.legend(["Total Roads", "Flooded Roads (10m)", "Flooded Roads (15m)", "Flooded Roads (20m)"], title="Flooding Buffers")
plt.tight_layout()

#Show plot
# plt.show()

# Save plot to a BytesIO object
image_stream = BytesIO()
plt.savefig(image_stream, format="png")
image_stream.seek(0)

# Encode image to base64
image_base64 = base64.b64encode(image_stream.getvalue()).decode("utf-8")

# Create HTML content
html_content = f"""
    <img src="data:image/png;base64,{image_base64}" alt="Flooded Roads Per Districts">
"""
# Save HTML file
html_file_path = os.path.join(output_folder, "flooded_roads.html")
with open(html_file_path, "w", encoding="utf-8") as html_file:
    html_file.write(html_content)

print(f"HTML file saved at: {html_file_path}")