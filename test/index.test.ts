import axios from 'axios';
import { Coop } from '../src';

jest.mock('axios');

axios.create = jest.fn().mockReturnThis();
const requestMock = axios.request as jest.Mock;

describe('Coop client', () => {
    it('should create a client object', () => {
        const client = new Coop();
        expect(client).toBeDefined();
    });

    it('should make a GET request', async () => {
        const client = new Coop();
        requestMock.mockReturnValueOnce({
            statusText: 'OK',
            data: {
                message: 'Hello World'
            }
        });
        const response = await client.get('/');
        expect(response).toStrictEqual({ message: 'Hello World' });
    });

    it('should error from the GET request', async () => {
        const client = new Coop();
        requestMock.mockReturnValueOnce({
            statusText: 'Internal Server Error'
        });
        try {
            await client.get('/');
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

    it('should log the request in the console', async () => {
        const logSpy = jest.spyOn(console, 'log');
        logSpy.mockImplementation(() => {});
        const client = new Coop({
            verbose: true
        });
        requestMock.mockReturnValueOnce({
            statusText: 'OK'
        });
        await client.get('/');
        expect(logSpy).toHaveBeenCalledTimes(3);
    });

    it('should create default headers', () => {
        const client = new Coop();
        const headers = client.createHeader();
        expect(headers).toStrictEqual({
            'Content-Type': 'application/json',
            'User-Agent': 'coop-wrapper'
        });
    });

    it('should create properly formatted URL from query', () => {
        const client = new Coop();
        const url = client.createURL('', {
            test: 'test'
        });
        expect(url).toBe('https://api.coop.nl/INTERSHOP/rest/WFS/COOP-2800-Site/?test=test');
    });
});
