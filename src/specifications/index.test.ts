import specification from ".";

describe("Specification", () => {
  it("should be able to create a specification", () => {
    // given
    interface Monster {
      type: "MONSTER";
    }
    const isMonster = specification<Monster>(
      (candidate) => candidate.type === "MONSTER"
    );
    const monster: Monster = {
      type: "MONSTER",
    };

    // when
    const result = isMonster.isSatisfiedBy(monster);

    // then
    expect(result).toBe(true);
  });

  it("should be able to create a specification with and", () => {
    // given
    interface Monster {
      type: "MONSTER";
    }
    const isMonster = specification<Monster>(
      (candidate) => candidate.type === "MONSTER"
    );
    const isUndead = specification<Monster>(
      (candidate) => candidate.type === "UNDEAD"
    );
    const monster: Monster = {
      type: "MONSTER",
    };

    // when
    const result = isMonster.and(isUndead).isSatisfiedBy(monster);

    // then
    expect(result).toBe(false);
  });
});
