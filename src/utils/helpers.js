export const refreshPage = () => {
	window.location.reload();
};

export const initialTimer = () => {
	const time = new Date();
	time.setSeconds(time.getSeconds() + 90);

	return time;
};
