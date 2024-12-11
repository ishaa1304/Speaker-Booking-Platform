export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'user' | 'speaker';
  isVerified: boolean;
}

export interface Speaker extends User {
  expertise: string[];
  pricePerSession: number;
  bio: string;
  availability: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Session {
  id: string;
  speakerId: string;
  userId: string;
  timeSlot: TimeSlot;
  status: 'pending' | 'confirmed' | 'cancelled';
}