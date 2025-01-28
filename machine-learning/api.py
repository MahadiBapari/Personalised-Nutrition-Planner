from flask import Flask, request, jsonify
from recommender import FoodRecommender

app = Flask(__name__)

# Initialize the recommender
recommender = FoodRecommender('dataset/nutrients_csvfile.csv')

@app.route('/recommend', methods=['POST'])
def recommend_foods():

    #POST /recommend
    #Body: { "calories": int, "protein": int, "fat": int, "carbs": int }

    try:
        data = request.json
        preferences = [data['calories'], data['protein'], data['fat'], data['carbs']]
        recommendations = recommender.recommend(preferences)
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

if __name__ == '__main__':
    app.run(port=5001)
