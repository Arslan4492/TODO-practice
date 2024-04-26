const TODOHero = ({ completed, total }) => {
  return (
    <section className="border flex items-center justify-around self-center w-[90%] max-w-[455px] p-3 rounded-[11px] border-solid border-[#c2b39a] hero_section">
      <div>
        <p className="text-3xl">Task Done</p>
        <p className="text-xl">Keep it up</p>
      </div>
      <div>
        {completed}/{total}
      </div>
    </section>
  );
};

export default TODOHero;
