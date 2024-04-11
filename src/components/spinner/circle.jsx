const CircleWithTextSVG = () => {
    return (
        <svg width="40" height="40" viewBox="0 0 200 200">
            {/* Circle for the background */}
            <circle cx="100" cy="100" r="90" fill="#4D774E" stroke="#4D774E" strokeWidth="2" />
            {/* Define a slightly smaller circle path for the text to follow for padding */}
            <path id="circlePath" d="M100,20 a80,80 0 1,0 0,160 a80,80 0 1,0 0,-160" fill="none" stroke="none" />
            {/* Apply the text to the path */}
            <text fill="white" fontSize="18" fontWeight="medium">
                <textPath xlinkHref="#circlePath" startOffset="50%" textAnchor="middle">
                    Ollion • Player 01 • Ollion • CEO • Player 01 • Ollion • CEO •
                </textPath>
            </text>
            {/* Small white dot in the center */}
            <circle cx="100" cy="100" r="10" fill="white" />
        </svg>
    );
};

export default CircleWithTextSVG;
