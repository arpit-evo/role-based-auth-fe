import { REVERSE_ROLES } from "../utils/enums";

export default function WelcomeCard(props) {
  const { user } = props;

  return (
    <section className="min-w-96 mb-10 max-w-7xl mx-auto cursor-default">
      <p className="font-bold text-4xl"> Welcome, {user.name}</p>
      <p className="text-lg">
        Your role is{" "}
        <span className="underline lowercase">{REVERSE_ROLES[user.role]}</span>
      </p>
    </section>
  );
}
