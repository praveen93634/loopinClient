import io from 'socket.io-client';
import { environment } from '../../../environments/environment.development';

export const createaConnections=()=>{
    return io(environment.apiUrl)
}