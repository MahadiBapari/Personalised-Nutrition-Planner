import pandas as pd
from sklearn.neighbors import NearestNeighbors

class FoodRecommender:
    def __init__(self, data_path):

        # Loading and preprocessing dataset
        self.df = pd.read_csv(data_path)
        self.df.columns = self.df.columns.str.strip().str.lower()

        required_columns = {'calories', 'protein', 'fat', 'carbs', 'food'}
        if not required_columns.issubset(self.df.columns):
            raise ValueError(f"Dataset must contain these columns: {required_columns}") 
        
       # Cleaning numeric columns 
        numeric_columns = ['calories', 'protein', 'fat', 'carbs']

        for col in numeric_columns:

            # Removing non-numeric characters and convert to float
            self.df[col] = pd.to_numeric(
                self.df[col].replace(r'[^\d.]+', '', regex=True), errors='coerce'
            )
        
        # Dropping rows with missing values
        self.df = self.df.dropna(subset=numeric_columns)

        self.features = self.df[numeric_columns] 
        self.food_names = self.df['food'] 


        # Training the nearest neighbors model
        self.model = NearestNeighbors(n_neighbors=5, metric='euclidean')
        self.model.fit(self.features)

    def recommend(self, preferences):

        # Recommending foods based on user preferences.
        distances, indices = self.model.kneighbors([preferences])
        recommended_foods = self.food_names.iloc[indices[0]].values
        return recommended_foods.tolist()