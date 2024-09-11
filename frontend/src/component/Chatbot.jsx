import { useRef, useEffect, useState } from "react";
import { TextField, Grid, Paper, Typography } from "@mui/material";
import { Box, IconButton, Divider, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ForumIcon from "@mui/icons-material/Forum";
import axios from "axios";

// Predefined answers for instant answers section
const predefinedAnswers = {
  "Shipping details?": `
    For domestic shipping:\n
    Shipping within Sri Lanka\n
    Shipping Method: CityPak\n
    Shipping Time: 2-3 Business days\n
    Shipping Cost: LKR 399/= \n\n

    For international shipping:\n
    Shipping Method: DHL\n
    Shipping Time: 5-7 Business days\n
    Shipping Cost: Depends on the items in your cart and the weight.
  `,
  "Contact info?": `
    Contact Number: +94779994374 \n
    Email: support@sliit.lk
  `,
  "Currently offers?": `
    - 10% off on all items for new customers.\n
    - Free shipping on orders over LKR 5000.\n
    - Buy 2 Get 1 Free on selected items.
  `,
  "Return policy?": `
    You can return items within 30 days of purchase.\n
    Items must be in original condition with tags attached.\n
    Shipping fees for returns will be borne by the customer unless the item is defective.
  `,
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Toggle chatbox visibility
  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  // Handle sending a message to the chatbot
  const handleSend = async () => {
    if (userInput.trim() === "") return;

    const userMessage = { sender: "user", text: userInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/chat-bot/chatbot",
        {
          message: userInput,
        }
      );

      const botMessages = [
        { sender: "bot", text: data.reply },
        ...data.images.map((image) => ({ sender: "bot", image })),
      ];

      setMessages([...updatedMessages, ...botMessages]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle predefined question click
  const handlePredefinedQuestionClick = (question) => {
    const answer = predefinedAnswers[question];
    const userMessage = { sender: "user", text: question };
    const botMessage = { sender: "bot", text: answer };

    setMessages([...messages, userMessage, botMessage]);
  };

  // Scroll chat to the bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box sx={{ position: "fixed", bottom: 25, right: 25, zIndex: 10 }}>
      <IconButton
        onClick={toggleChatbox}
        sx={{
          backgroundColor: "#003366",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#000060",
          },
          width: 70,
          height: 70,
          borderRadius: "50%",
          boxShadow: 3,
        }}
      >
        <ForumIcon sx={{ fontSize: "2rem" }} />
      </IconButton>

      {isOpen && (
        <Paper
          elevation={4}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 16,
            width: 400,
            height: 650,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              background: "#003366",
              color: "white",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <Typography variant="h6" mx={2} mt={1}>
              Chat with us
            </Typography>
            <Typography mx={2} mb={1}>
              👋 Hello! Please message us if you have questions
            </Typography>
            <Divider />
          </Box>
          <Box
            sx={{ flex: 1, overflowY: "auto", mb: 2, p: 2 }}
            ref={chatContainerRef}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  my: 1,
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: "inline-block",
                    p: 1,
                    bgcolor: msg.sender === "user" ? "#003366" : "#e0e0e0",
                    borderRadius: 2,
                    color: msg.sender === "user" ? "#fff" : "#000",
                  }}
                >
                  {msg.text}
                </Typography>
                {msg.image && (
                  <Box
                    sx={{
                      backgroundImage: `url(${msg.image})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      height: "400px",
                      boxShadow: "initial",
                    }}
                  ></Box>
                )}
              </Box>
            ))}
          </Box>
          <Box px={2}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              Instant Answers
            </Typography>
            <Grid container spacing={1}>
              {Object.keys(predefinedAnswers).map((question, index) => (
                <Grid item xs={6} key={index}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: "#003366",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#003388",
                      },
                    }}
                    onClick={() => handlePredefinedQuestionClick(question)}
                  >
                    {question}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Write message..."
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSend} disabled={loading}>
                  <SendIcon />
                </IconButton>
              ),
            }}
            sx={{ mt: 2 }}
          />
        </Paper>
      )}
    </Box>
  );
};

export default Chatbot;
