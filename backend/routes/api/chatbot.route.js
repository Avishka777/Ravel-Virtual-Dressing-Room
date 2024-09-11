const express = require("express");
const router = express.Router();

// Mock data for suggestions based on skin tone, weather, and gender
const skinToneSuggestions = {
  light: {
    men: {
      sunny: {
        colors: ["Light yellow", "White", "Pastel shades"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-men-sunny-1.jpg?alt=media&token=25eb0154-9df2-4d22-99e1-7ab1bf3db79d",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-men-sunny-2.jpg?alt=media&token=48d99bf5-c310-447b-abf4-327cd5b1000b",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-men-sunny-3.jpg?alt=media&token=edbc0b87-05bb-4276-8d98-e72561f0e054",
        ],
      },
      cloudy: {
        colors: ["Soft gray", "Light blue", "Beige"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-men-cloudy-1.jpg?alt=media&token=7d6b6ecd-adb7-4772-bc3e-0c2edb5fc747",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-men-cloudy-2.jpg?alt=media&token=cb32f48c-30d2-4930-98f6-9a9dab05e211",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-men-cloudy-3.jpg?alt=media&token=cc8db931-0ad9-41db-bec7-88c77868d95c",
        ],
      },
      winter: {
        colors: ["Warm white", "Soft pink", "Camel brown"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-men-winter-1.jpg?alt=media&token=bf561274-9d89-42d1-ba70-68defb2ee786",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-men-winter-2.jpg?alt=media&token=442bfa6c-53f2-465b-88b3-e4e62a0629c4",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-men-winter-3.jpg?alt=media&token=cc1746a9-415a-4e1b-9f78-fd8c048d167d",
        ],
      },
    },
    women: {
      sunny: {
        colors: ["Light yellow", "White", "Pastel shades"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-women-sunny-1.jpg?alt=media&token=7e8de96c-96b9-4a3e-b3be-2a9926a55235",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-women-sunny-2.jpg?alt=media&token=7a5b3317-9d2f-41a8-8e10-bca0555f2930",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-women-sunny-3.jpg?alt=media&token=b370f54f-93dd-458c-a066-976c31449049",
        ],
      },
      cloudy: {
        colors: ["Soft gray", "Light blue", "Beige"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-women-cloudy-1.jpg?alt=media&token=c21ccb1d-d69f-43f1-a08f-8341195efea5",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-women-cloudy-2.jpg?alt=media&token=8b00ccf6-4fee-49be-a328-0415e699614e",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-women-cloudy-3.jpg?alt=media&token=9f0f60ae-42bb-428e-834d-0ef4d035c437",
        ],
      },
      winter: {
        colors: ["Warm white", "Soft pink", "Camel brown"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-women-winter-1.jpg?alt=media&token=d20ef560-2dae-4cde-ae5a-ebdc20b7da01",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-women-winter-2.jpg?alt=media&token=61203983-a298-4548-a728-fb71af2c669f",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/light-women-winter-3.jpg?alt=media&token=bd652177-8f2c-4231-af45-a20cac9e5276",
        ],
      },
    },
  },
  medium: {
    men: {
      sunny: {
        colors: ["Rich red", "Olive green", "Mustard yellow"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-men-sunny-1.jpg?alt=media&token=c5dab760-319c-4980-9a63-b9e4966b5413",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-men-sunny-2.jpg?alt=media&token=daa35635-af69-401e-876c-485f47d0ef37",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-men-sunny-3.jpg?alt=media&token=36c6f1a7-5feb-4a9a-aa5e-fb5597a71f94",
        ],
      },
      cloudy: {
        colors: ["Dusty rose", "Mocha", "Deep teal"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-men-cloudy-1.jpg?alt=media&token=56e39141-4c32-451e-ae06-c94d7c80ee8d",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-men-cloudy-2.jpg?alt=media&token=25f864cd-531d-4d66-9db1-0476b5a1b64c",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-men-cloudy-3.jpg?alt=media&token=77c1f026-b26c-4dc2-9e3c-4af30cadd305",
        ],
      },
      winter: {
        colors: ["Navy blue", "Emerald green", "Charcoal gray"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-men-winter-1.jpg?alt=media&token=ae5529ac-20c5-4678-b39f-ada4535bc69c",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-men-winter-2.jpg?alt=media&token=cbd7434e-1737-4867-8fda-f896aa995a19",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-men-winter-3.jpg?alt=media&token=9cebb06b-3dca-4840-a446-336577a46fff",
        ],
      },
    },
    women: {
      sunny: {
        colors: ["Rich red", "Olive green", "Mustard yellow"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-woman-sunny-1.jpg?alt=media&token=78d57f7d-35ba-4344-848a-9f4101c9981d",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-woman-sunny-2.jpg?alt=media&token=6d77ccc6-c421-41b4-9a10-05998becfbb4",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-woman-sunny-3.jpg?alt=media&token=619a1ff7-fc30-4fd9-be7c-43cb0965b041",
        ],
      },
      cloudy: {
        colors: ["Dusty rose", "Mocha", "Deep teal"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-woman-cloudy-1.jpg?alt=media&token=9df0cf7c-7432-4c7c-b08c-d89a57112c83",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-woman-cloudy-2.jpg?alt=media&token=3b9e50d1-d56f-4b20-829c-855431cc3abb",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-woman-cloudy-3.jpg?alt=media&token=c7bf2dcc-2093-4fac-8206-4fd1dd2e0a27",
        ],
      },
      winter: {
        colors: ["Navy blue", "Emerald green", "Charcoal gray"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-woman-winter-1.jpg?alt=media&token=ff17620f-2a67-4f0e-91f3-500ac58cb355",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-woman-winter-2.jpg?alt=media&token=cba16c69-3d6d-43db-b7cc-02fdb1592893",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/medium-woman-winter-3.jpg?alt=media&token=1e78d6ba-a3c1-4c60-9d1c-fc43c9ab1ae5",
        ],
      },
    },
  },
  dark: {
    men: {
      sunny: {
        colors: ["Bright yellow", "Coral", "Electric blue"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-men-sunny-1.jpg?alt=media&token=38144320-d297-4963-82c9-6c2b2a2c1eaa",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-men-sunny-2.jpg?alt=media&token=db0a209b-b5a2-4c14-8558-ebfe91e1e907",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-men-sunny-3.jpg?alt=media&token=cec87362-9a7e-422c-abeb-cda94d928331",
        ],
      },
      cloudy: {
        colors: ["Burgundy", "Plum", "Forest green"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-men-cloudy-1.jpg?alt=media&token=d2a81295-fb24-4bf7-bc38-18b7b1c41ed9",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-men-cloudy-2.jpg?alt=media&token=41b07d51-0718-48f2-9f03-45bc12e63b4c",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-men-cloudy-3.jpg?alt=media&token=777a82e1-ddc6-46dd-9eb4-f5bf28ddf2ad",
        ],
      },
      winter: {
        colors: ["Royal blue", "Fuchsia", "Chocolate brown"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-men-winter-1.jpg?alt=media&token=eeb15565-4d8e-49f2-b1a6-c78bcbccb2eb",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-men-winter-2.jpg?alt=media&token=550cae57-9691-4537-8bc1-b250bdd623b6",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-men-winter-3.jpg?alt=media&token=87fa0477-2204-49eb-9dce-38344cabb2c5",
        ],
      },
    },
    women: {
      sunny: {
        colors: ["Bright yellow", "Coral", "Electric blue"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-women-sunny-1.jpg?alt=media&token=139dd289-3e0c-49ab-9952-5d5f2a05717e",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-women-sunny-2.jpg?alt=media&token=7d4fb1a7-03d5-4e8e-97bd-3057cff4814b",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-women-sunny-3.jpg?alt=media&token=98f3f7e6-7e4b-413f-9576-0d9bce6b6a2b",
        ],
      },
      cloudy: {
        colors: ["Burgundy", "Plum", "Forest green"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-women-cloudy-1.jpg?alt=media&token=e5adf2b0-899e-4b57-9109-79d594e5bcb1",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-women-cloudy-2.jpg?alt=media&token=e04dd147-345d-4a62-aa6b-e905af604ed8",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-women-cloudy-3.jpg?alt=media&token=0b90ecdb-c658-4597-ae94-3c9ca90ac5fd",
        ],
      },
      winter: {
        colors: ["Royal blue", "Fuchsia", "Chocolate brown"],
        images: [
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-women-winter-1.jpg?alt=media&token=b346eef2-3f6a-4c30-b421-608aef1fcc5c",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-women-winter-2.jpg?alt=media&token=0f1729c4-7935-46c9-830b-4a05fdc727e3",
          "https://firebasestorage.googleapis.com/v0/b/for-testing-a33dd.appspot.com/o/dark-women-winter-3.jpg?alt=media&token=a64f52db-8cee-447c-8cf8-f9ae98e3c93b",
        ],
      },
    },
  },
};

// In-memory storage for conversation state
let conversationState = {};

router.post("/chatbot", (req, res) => {
  const { message } = req.body;
  const sessionId = req.sessionID || "default"; // Assume you're using sessions; use a default for testing.
  let reply = "Sorry, I didn’t understand that.";
  let images = [];

  // Initialize conversation state if not exists
  if (!conversationState[sessionId]) {
    conversationState[sessionId] = {
      step: "greet",
      skinTone: null,
      weather: null,
      gender: null,
    };
  }

  const state = conversationState[sessionId];

  switch (state.step) {
    case "greet":
      reply =
        "Hello, I am your virtual assistant. I can suggest some clothes according to your skin color and the best clothing styles for you. Please tell me your skin tone: light, medium, or dark.";
      state.step = "askSkinTone";
      break;

    case "askSkinTone":
      if (["light", "medium", "dark"].includes(message.toLowerCase())) {
        state.skinTone = message.toLowerCase();
        reply = `Great! Now, please tell me your gender: men or women.`;
        state.step = "askGender";
      } else {
        reply = "Please tell me your skin tone: light, medium, or dark.";
      }
      break;

    case "askGender":
      if (["men", "women"].includes(message.toLowerCase())) {
        state.gender = message.toLowerCase();
        reply = `Thanks! How is the weather today? (e.g., sunny, cloudy, winter)`;
        state.step = "askWeather";
      } else {
        reply = "Please specify your gender: men or women.";
      }
      break;

    case "askWeather":
      if (["sunny", "cloudy", "winter"].includes(message.toLowerCase())) {
        state.weather = message.toLowerCase();
        const suggestions =
          skinToneSuggestions[state.skinTone][state.gender][state.weather];
        reply = `For a ${
          state.weather
        } day, I suggest wearing colors like ${suggestions.colors.join(", ")}.`;
        images = suggestions.images;
        state.step = "suggestClothes";
      } else {
        reply = `Please tell me the weather condition: sunny, cloudy, or winter.`;
      }
      break;

    case "suggestClothes":
      reply =
        "Would you like more suggestions or need help with something else?";
      state.step = "loopCheck";
      break;

    case "loopCheck":
      if (message.toLowerCase() === "yes") {
        reply = "Please tell me your skin tone: light, medium, or dark.";
        state.step = "askSkinTone";
      } else if (message.toLowerCase() === "no") {
        reply = "Thank you for using the virtual assistant!";
        state.step = "greet";
      } else {
        reply = "Please answer with 'yes' or 'no'.";
      }
      break;

    default:
      reply = "Sorry, I’m not sure how to proceed.";
  }

  res.json({ reply, images });
});

module.exports = router;