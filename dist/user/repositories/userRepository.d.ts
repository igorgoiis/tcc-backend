import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
}
