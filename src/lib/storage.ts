
import { v4 as uuidv4 } from "uuid";
import { Professional, Session, User, DEFAULT_PROFESSIONALS } from "./types";

// Helper function to get data from localStorage with a default value
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from storage:`, error);
    return defaultValue;
  }
};

// Helper function to save data to localStorage
const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
};

// User functions
export const getUsers = (): User[] => {
  return getFromStorage<User[]>("users", []);
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const createUser = (username: string): User => {
  const users = getUsers();
  const newUser: User = {
    id: uuidv4(),
    username,
    created_at: new Date().toISOString()
  };
  
  users.push(newUser);
  saveToStorage("users", users);
  return newUser;
};

// Professional functions
export const getProfessionals = (): Professional[] => {
  return getFromStorage<Professional[]>("professionals", DEFAULT_PROFESSIONALS);
};

export const getProfessionalById = (id: string): Professional | undefined => {
  const professionals = getProfessionals();
  return professionals.find(prof => prof.id === id);
};

// Session functions
export const getSessions = (): Session[] => {
  return getFromStorage<Session[]>("sessions", []);
};

export const getSessionsByUserId = (userId: string): Session[] => {
  const sessions = getSessions();
  return sessions.filter(session => session.user_id === userId);
};

export const createSession = (session: Omit<Session, "id">): Session => {
  const sessions = getSessions();
  const newSession: Session = {
    ...session,
    id: uuidv4(),
  };
  
  sessions.push(newSession);
  saveToStorage("sessions", sessions);
  return newSession;
};

// Current user management
export const getCurrentUser = (): User | null => {
  return getFromStorage<User | null>("currentUser", null);
};

export const setCurrentUser = (user: User | null): void => {
  saveToStorage("currentUser", user);
};

// Simulated email function
export const sendEmailToProfessional = (
  professionalId: string, 
  patientName: string, 
  assessmentType: string,
  score: number,
  severityLevel: number
): { success: boolean; message: string } => {
  try {
    const professional = getProfessionalById(professionalId);
    if (!professional) {
      return { 
        success: false, 
        message: "Professional not found" 
      };
    }
    
    // In a real app, this would send an actual email
    // This is just a simulation for the MVP
    console.log(`Simulated email sent to ${professional.name} about patient ${patientName}`);
    console.log(`Assessment: ${assessmentType}, Score: ${score}, Severity: ${severityLevel}`);
    
    // Return success response
    return { 
      success: true, 
      message: `Email notification sent to ${professional.name}` 
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { 
      success: false, 
      message: "Failed to send email notification" 
    };
  }
};
