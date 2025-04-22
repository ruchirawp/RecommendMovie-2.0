import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Fade,
} from "@mui/material";
import axios from "axios";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { UserContext } from "../../UserContext";
import { useDispatch } from "react-redux";
import { setTier } from "../../redux/slices/tierSlice";
import { baseUrl } from "../../services/baseValues";

const Success = () => {
  const { user, setUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const [hasFetched, setHasFetched] = useState(false);
  const [currentTier, setCurrentTier] = useState("");
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const fetchUpdatedUser = async () => {
      if (!user?.token || hasFetched) return;

      try {
        const response = await axios.get(`${baseUrl}/getUser`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        const updatedUser = response.data.user;
        if (!updatedUser) return;

        const stored = JSON.parse(window.localStorage.getItem("loggedUser"));
        const updated = { ...stored, user: updatedUser };
        window.localStorage.setItem("loggedUser", JSON.stringify(updated));

        setUser(updated);
        dispatch(setTier(updatedUser.tier));
        setCurrentTier(updatedUser.tier);
        setHasFetched(true);
        setLoading(false);
        // console.log("✅ User tier updated:", updatedUser.tier);
      } catch (error) {
        // console.error("❌ Failed to fetch updated user:", error);
        setLoading(false);
      }
    };

    fetchUpdatedUser();
  }, [user, hasFetched, dispatch, setUser]);

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Confetti width={width} height={height} numberOfPieces={300} />
      <Fade in timeout={500}>
        <Paper
          elevation={6}
          sx={{
            maxWidth: 500,
            padding: 4,
            borderRadius: 3,
            textAlign: "center",
            backgroundColor: "#ffffffdd",
            backdropFilter: "blur(10px)",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant="h4" gutterBottom color="primary">
                🎉 Payment Successful!
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Thank you for supporting RecommendMovie!
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  fontWeight: 600,
                  color: "#2e7d32",
                }}
              >
                Your current plan:{" "}
                <Box component="span" sx={{ fontWeight: 700 }}>
                  {currentTier}
                </Box>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/movies"
                sx={{ mt: 4 }}
              >
                Explore Recommendations
              </Button>
            </>
          )}
        </Paper>
      </Fade>
    </Box>
  );
};

export default Success;
