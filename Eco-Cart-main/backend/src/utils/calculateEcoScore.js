const calculateEcoScore = (carbonFootprint) => {
  if (carbonFootprint <= 1.5) return "A+";
  if (carbonFootprint <= 3.0) return "A";
  if (carbonFootprint <= 5.0) return "B";
  if (carbonFootprint <= 8.0) return "C";
  if (carbonFootprint <= 12.0) return "D";
  return "F";
};

export default calculateEcoScore;
