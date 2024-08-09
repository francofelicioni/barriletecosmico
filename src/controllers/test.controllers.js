import fs from 'fs'
import customErrors from '../errors/customErrors.js';

const path = 'logs/app.log'

export const loggerTest = async (req, res) => {
    try {
        const fileData = await fs.promises.readFile(path, 'utf-8');
        const logs = fileData.split('\n').map(line => {
            const [timestamp, level, ...messageParts] = line.split(' ');
            const message = messageParts.join(' ');
            return {
                timestamp,
                level,
                message
            };
        });
        return res.json({ status: 'success', payload: logs });
    } catch (error) {
        throw customErrors.serverError(error)
    }
}