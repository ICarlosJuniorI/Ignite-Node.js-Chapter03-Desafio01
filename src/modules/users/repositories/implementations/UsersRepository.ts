import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOneOrFail({ where: { id: user_id }, relations: ['games'] }) as User;
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = await this.repository.query(
      'SELECT * FROM users ORDER BY first_name ASC'
    );

    return users; // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const users = await this.repository.query(`SELECT * FROM users WHERE LOWER(first_name) ILIKE LOWER($1) AND LOWER(last_name) ILIKE LOWER($2)`, [
      first_name, last_name
    ]);

    return users; // Complete usando raw query
  }
}
