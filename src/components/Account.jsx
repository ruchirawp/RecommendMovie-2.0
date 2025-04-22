import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { UserContext } from "../UserContext";
import axios from "axios";
import { springBootUrl } from "../services/baseValues"; 

const Account = () => {
  const { user } = useContext(UserContext);

  const currentTier = user?.user?.tier || "Free Ticket";

  const tiers = [
    {
      name: "Free Ticket",
      emoji: "🎟️",
      price: "$0",
      description: "Basic access to recommendations and browsing.",
      isCurrent: currentTier === "Free Ticket",
    },
    {
      name: "Cinema Plus",
      emoji: "🍿",
      price: "$1.00",
      description: "Advanced search filters and premium recs.",
      isCurrent: currentTier === "Cinema Plus",
    },
    {
      name: "Directors Cut",
      emoji: "🎬",
      price: "$2.00",
      description: "Full access, early previews, and ad-free experience.",
      isCurrent: currentTier === "Directors Cut",
    },
  ];

  const handleUpgrade = async (tierName) => {
    try {
      if (tierName === "Free Ticket") {
        // Directly downgrade without Stripe
        const response = await axios.post(
          `${springBootUrl}/api/payment/downgrade`,
          { email: user.user.email, tier: "Free Ticket" },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.status === 200) {
          window.location.href = "/#/payment/success"; // or refresh the account page
        } else {
          alert("Downgrade failed.");
        }
      } else {
        // Stripe upgrade flow
        const response = await axios.post(
          `${springBootUrl}/api/payment/create-checkout-session`,
          { 
            tier: tierName,
            email: user.user.email
           },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.data.url) {
          window.location.href = response.data.url;
        } else {
          alert("Something went wrong: No URL returned.");
        }
      }
    } catch (error) {
      console.error("Error starting Stripe checkout:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Grid container spacing={4} direction="column" alignItems="center" sx={{ width: "100%" }}>
        {tiers.map((tier, index) => (
          <Grid item key={index} sx={{ width: "60%" }}>
            <Paper
              elevation={tier.isCurrent ? 6 : 1}
              sx={{
                p: 3,
                backgroundColor: tier.isCurrent ? "#f5f5f5" : "#ffffff",
                border: tier.isCurrent ? "2px solid #2196f3" : "1px solid #ccc",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h5">
                {tier.emoji} {tier.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {tier.description}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                {tier.price}
              </Typography>

              {tier.isCurrent ? (
                <Button variant="outlined" disabled sx={{ mt: 2 }}>
                  Current Plan
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleUpgrade(tier.name)}
                >
                  {tier.name == "Free Ticket"? "Revert to" : "Upgrade to"} {tier.name}
                </Button>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Account;
