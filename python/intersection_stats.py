import psycopg2
import matplotlib.pyplot as plt
import os
import base64
from io import BytesIO

# Ensure the subfolder exists
output_folder = "python/output"
os.makedirs(output_folder, exist_ok=True)

import psycopg2
import matplotlib.pyplot as plt
import pandas as pd

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

# Query to count intersections per district
query = """
    SELECT districts_bactuliem."NAME_3", COUNT(road_intersections_bactuliem.id) 
    FROM districts_bactuliem 
    JOIN road_intersections_bactuliem ON ST_Intersects(districts_bactuliem.geom, road_intersections_bactuliem.geom) 
    GROUP BY districts_bactuliem."NAME_3";
"""

# Fetch data
data = fetch_data(query)

# Convert to Pandas DataFrame
df = pd.DataFrame(data, columns=["District", "Intersection Count"])

# Create Pie Chart
fig, ax = plt.subplots(figsize=(8, 8))
ax.pie(df["Intersection Count"], labels=df["District"], autopct="%1.1f%%", startangle=90, colors=plt.cm.tab20.colors)

ax.set_title("Intersection Counts Per District")
plt.tight_layout()

# Show plot
# plt.show()

# Save plot to a BytesIO object
image_stream = BytesIO()
plt.savefig(image_stream, format="png")
image_stream.seek(0)

# Encode image to base64
image_base64 = base64.b64encode(image_stream.getvalue()).decode("utf-8")

# Create HTML content
html_content = f"""
    <img src="data:image/png;base64,{image_base64}" alt="Intersections Per Districts">
"""

# Save HTML file
html_file_path = os.path.join(output_folder, "intersection_data.html")
with open(html_file_path, "w", encoding="utf-8") as html_file:
    html_file.write(html_content)

print(f"HTML file saved at: {html_file_path}")