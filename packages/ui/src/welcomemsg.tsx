interface WelcomeProps {
  username: string;
}

export const WelcomeMessage = ({ username }: WelcomeProps) => {
  return (
    <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg text-white text-center">
      <p className="text-2xl font-bold mb-5 animate-bounce">👋 Welcome!</p>
      <p className="text-4xl">
        Hello,
        <span className="ml-3 font-semibold text-yellow-300">{username}</span>
      </p>
    </div>
  );
};
