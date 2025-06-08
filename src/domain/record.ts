export class UserDataRecord {
  constructor(
    public name: string,
    public description: string,
    public github_id: string,
    public qiita_id: string,
    public x_id: string,
    public skill?: string,
    public user_id?: string,
  ) {}

  public static newUserDataRecord(
    name: string,
    description: string,
    github_id: string,
    qiita_id: string,
    x_id: string,
    skill?: string,
    user_id?: string,
  ): UserDataRecord {
    return new UserDataRecord(
      name,
      description,
      github_id,
      qiita_id,
      x_id,
      skill,
      user_id,
    );
  }
}

export class UserSkillRecord {
  constructor(
    public id: string | number,
    public user_id: string | undefined,
    public skill_id: number,
  ) {}

  public static newUserSkillRecord(
    id: string | number,
    user_id: string | undefined,
    skill_id: number,
  ): UserSkillRecord {
    return new UserSkillRecord(id, user_id, skill_id);
  }
}

export class UserSkills {
  constructor(
    public id: number | undefined,
    public name: string,
  ) {}

  public static newUserSkills(
    id: number | undefined,
    name: string,
  ): UserSkills {
    return new UserSkills(id, name);
  }
}
