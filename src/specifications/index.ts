interface Specification<T> {
  isSatisfiedBy: (candidate: T) => boolean;
  and: (specification: Specification<T>) => Specification<T>;
  or: (specification: Specification<T>) => Specification<T>;
  not: () => Specification<T>;
}

type Rule = (candidate: any) => boolean;

const specification = <T>(rule: Rule): Specification<T> => {
  const isSatisfiedBy = (candidate: any): boolean => rule(candidate);

  const and = (specification: Specification<T>): Specification<T> => {
    const isSatisfiedBy = (candidate: any): boolean =>
      rule(candidate) && specification.isSatisfiedBy(candidate);
    return { isSatisfiedBy, and, or, not };
  };

  const or = (specification: Specification<T>): Specification<T> => {
    const isSatisfiedBy = (candidate: any): boolean =>
      rule(candidate) || specification.isSatisfiedBy(candidate);
    return { isSatisfiedBy, and, or, not };
  };

  const not = (): Specification<T> => {
    const isSatisfiedBy = (candidate: any): boolean => !rule(candidate);
    return { isSatisfiedBy, and, or, not };
  };

  return {
    isSatisfiedBy,
    and,
    or,
    not,
  };
};

export default specification;
