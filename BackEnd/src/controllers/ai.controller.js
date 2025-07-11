const aiServices = require("../services/ai.service")


module.exports.getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("Prompt is required");
    }
    try {
        const response = await aiServices(code);
        res.send(response);
    } catch (error) {
        console.error('AI Service Error:', error);
        res.status(500).send('Sorry, something went wrong while reviewing your code. Please try again later.');
    }
}