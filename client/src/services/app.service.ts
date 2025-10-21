import axios from "axios";

class AppService {
    static baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

    static getDroneConfig(droneId: string) {
        return axios.get(`${this.baseUrl}/configs/${droneId}`);
    }

    static getDroneLogs(droneId: string, page: number) {
        return axios.get(`${this.baseUrl}/logs/${droneId}?page=${page}`);
    }

    static createLogEntry(logData: any) {
        return axios.post(`${this.baseUrl}/logs`, logData);
    }
}

export default AppService;