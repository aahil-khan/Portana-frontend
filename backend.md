# Backend API Endpoints Needed

This document tracks backend endpoints that need to be implemented for Portana V2.0 features.

## Currently Required: None

All V2.0 features are using mock/client-side data for now.

---

## Future Considerations

### Contextual Memory System
- **Endpoint**: `GET /api/context/suggestions`
- **Purpose**: Return contextual command chip suggestions based on conversation history
- **Request**: `{ currentCommand: string, lastMessages: Message[] }`
- **Response**: `{ suggestions: Array<{ label: string, command: string, icon: string }> }`
- **Status**: Not needed yet - using hardcoded contextual chips

### Ghost Typing Examples
- **Endpoint**: `GET /api/suggestions/prompts`
- **Purpose**: Dynamic placeholder text examples for input bar cycling
- **Response**: `{ prompts: string[] }`
- **Status**: Not needed yet - using hardcoded array

### Genesis Terminal Stats
- **Endpoint**: `GET /api/stats`
- **Purpose**: Real-time portfolio statistics for Genesis boot sequence terminal text
- **Response**: `{ projects: number, blogPosts: number, technologies: number }`
- **Status**: Not needed yet - using generic boot messages

---

## Completed Endpoints

None yet - all features currently client-side.
