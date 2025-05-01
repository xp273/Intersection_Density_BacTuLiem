import psycopg2
import matplotlib.pyplot as plt
import json
import os
import base64
from io import BytesIO

# Ensure the subfolder exists
output_folder = "python/output"
os.makedirs(output_folder, exist_ok=True)

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="Road_analysis",
    user="postgres",
    password="xuanphat0327",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# Execute SQL query
cur.execute("""
    SELECT "VARNAME_3", COUNT(r.id) AS intersection_count
    FROM districts_bactuliem d
    LEFT JOIN road_intersections_bactuliem r
    ON ST_Contains(d.geom, r.geom)
    GROUP BY "VARNAME_3";
""")
results = cur.fetchall()
conn.close()

# Extract data for plotting
districts = [row[0] for row in results]
counts = [row[1] for row in results]

# Plot data
fig, ax = plt.subplots(figsize=(10, 6))
ax.bar(districts, counts, color='skyblue')
ax.set_xlabel('Districts')
ax.set_ylabel('Number of Intersections')
ax.set_title('Road Intersections per District')
ax.set_xticks(range(len(districts)))
ax.set_xticklabels(districts, rotation=45)

tmpfile = BytesIO()
fig.savefig(tmpfile, format='png')
encoded = base64.b64encode(tmpfile.getvalue()).decode('utf-8')

html ='<img src=\'data:image/png;base64,{}\'>'.format(encoded)

output_file_path = os.path.join(output_folder, "intersection_data.html")
with open(output_file_path, "w") as f:
    f.write(html)
