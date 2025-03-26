import CallToAcrion from "../component/CallToAcrion";

export default function Projects() {
  return (
    <div className="min-h-screen w-full mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-md text-gray-500">
        Build fun and engaging projects while learning HTML, CSS, and
        JavaScript!
      </p>
      <CallToAcrion />
    </div>
  );
}
