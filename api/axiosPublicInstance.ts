import axios from 'axios';
import { PREFIX } from './api';

const axiosPublicInstance = axios.create({
	baseURL: PREFIX,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axiosPublicInstance;
