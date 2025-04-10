# Project - Bank Transactions Visualizer

## Overview

This project is a single-page application (SPA) designed to help users upload and analyze their bank transactions. The application allows users to upload a CSV file containing transaction data, which is then parsed, grouped by categories (e.g., income, expenses), and visualized using WebGL. The visualization is interactive, enabling users to explore their financial data in an intuitive and engaging way.

## Features

- **CSV Upload**: Users can upload a CSV file containing their bank transactions.
- **Data Parsing**: The application parses the uploaded file and extracts transaction details.
- **Categorization**: Transactions are grouped into categories such as income and expenses.
- **Interactive Visualization**:

  - Transactions are visualized in a 3D WebGL environment.
  - Users can interact with the visualization, such as expanding categories to view individual transactions.

- **Draft Visualization Ideas**:
  1. **3D Bar Chart on a Sphere**:
     - Each category is represented as a bar extending outward from the surface of a sphere.
     - The height of the bar corresponds to the total amount in that category.
     - Clicking a bar reveals individual transactions as smaller bars or points.
  2. **Force-Directed Graph**:
     - Categories are represented as nodes, with transactions as smaller nodes connected to their respective categories.
     - Users can drag nodes to rearrange the graph and explore relationships.
  3. **Galaxy Visualization**:
     - Categories are represented as planets, with transactions orbiting around them as smaller objects.
     - Users can zoom in on a planet to explore its transactions.
