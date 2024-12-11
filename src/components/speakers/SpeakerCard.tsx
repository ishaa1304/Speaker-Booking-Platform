import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Speaker } from "../../types";

interface SpeakerCardProps {
  speaker: Speaker;
  onBookSession: (speakerId: string, date: string) => void;
}

export function SpeakerCard({ speaker, onBookSession }: SpeakerCardProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<Date[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBookedSlots() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/speakers/booked-slots/${speaker._id}`
        );
        if (response.ok) {
          const data = await response.json();
          setBookedSlots(
            data.bookedSlots.map((slot: string) => new Date(slot))
          );
        } else {
          console.error("Failed to fetch booked slots");
        }
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookedSlots();
  }, [speaker._id]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleBookClick = async () => {
    if (!selectedDate) {
      alert("Please select a date and time.");
      return;
    }

    const date = new Date(selectedDate);
    if (date.getMinutes() !== 0 || date.getSeconds() !== 0) {
      alert("Please select a full hour.");
      return;
    }

    if (bookedSlots.some((slot) => slot.getTime() === date.getTime())) {
      alert("This time slot is already booked.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/speakers/book-session/${speaker._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: date.toISOString() }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setBookedSlots([...bookedSlots, date]);
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        <img
          src={`https://ui-avatars.com/api/?name=${speaker.firstName}+${speaker.lastName}&background=random`}
          alt={`${speaker.firstName} ${speaker.lastName}`}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold">
            {speaker.firstName} {speaker.lastName}
          </h3>
          <div className="flex items-center space-x-2 text-gray-600">
            <span>${speaker.pricePerSession}/session</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-600">{speaker.bio}</p>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Date and Time
        </label>
        <input
          type="datetime-local"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          onClick={handleBookClick}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 mt-2"
        >
          <Calendar className="w-5 h-5" />
          <span>Book Session</span>
        </button>
      </div>

      {loading ? (
        <div className="mt-4 text-gray-600">Loading booked slots...</div>
      ) : (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Booked Slots</h4>
          <ul>
            {bookedSlots.length > 0 ? (
              bookedSlots.map((slot) => (
                <li key={slot.toISOString()}>{slot.toLocaleString()}</li>
              ))
            ) : (
              <li>No slots booked yet.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
