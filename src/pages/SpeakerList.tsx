import { useEffect, useState } from "react";
import { SpeakerCard } from "../components/speakers/SpeakerCard";
import { Speaker } from "../types";

export function SpeakerList() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Fetch speakers from backend
    async function fetchSpeakers() {
      try {
        const response = await fetch("http://localhost:5000/api/speakers");
        if (response.ok) {
          const data = await response.json();
          setSpeakers(data);
        }
      } catch (error) {
        console.error("Error fetching speakers:", error);
      }
    }

    fetchSpeakers();

    // Check user authentication status (simple token presence check)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleBookSession = async (speakerId: string, date: string) => {
    if (!isAuthenticated) {
      alert("Please log in to book a session.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/speakers/book-session/${speakerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ date }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message);

        // Refresh the booked slots for the speaker
        setSpeakers((prevSpeakers) =>
          prevSpeakers.map((speaker) =>
            speaker.id === speakerId
              ? {
                  ...speaker,
                  bookedSlots: [...speaker.bookedSlots, new Date(date)],
                }
              : speaker
          )
        );
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to book session.");
      }
    } catch (error) {
      console.error("Error booking session:", error);
      alert("Error booking session. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Available Speakers
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <SpeakerCard
            key={speaker.id}
            speaker={speaker}
            onBookSession={handleBookSession}
          />
        ))}
      </div>
    </div>
  );
}
