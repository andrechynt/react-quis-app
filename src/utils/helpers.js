export const refreshPage = () => {
	window.location.reload();
};

export const initialTimer = () => {
	const time = new Date();
	time.setSeconds(time.getSeconds() + 180);

	return time;
};
