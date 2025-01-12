import axios from 'axios';
import { PREFIX } from './api';

const axiosPublicInstance = axios.create({
	baseURL: PREFIX, // Замените на ваш базовый URL
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axiosPublicInstance;
