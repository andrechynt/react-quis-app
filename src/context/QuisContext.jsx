/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";

export const QuisContext = createContext();

export const useQuis = () => {
	return useContext(QuisContext);
};