import React from 'react';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '../tokens';

const Loader = () => {
	return <ActivityIndicator size={'large'} color={COLORS.primary} />;
};

export default Loader;
