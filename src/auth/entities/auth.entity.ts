import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
  } from 'typeorm';
  import { Role } from '../role.enum';
  import { Rating } from 'src/rating/entities/rating.entity';
  import { Comment } from 'src/comment/entities/comment.entity';
  import { Like } from 'src/like/entities/like.entity';
  import { Cart } from 'src/cart/entities/cart.entity';
  
  @Entity('users')
  export class UserAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    emailAddress: string;
  
    @Column()
    hashedPassword: string;
  
    @Column({ default: false })
    verified: boolean;
  
    @Column({ type: 'varchar', nullable: true })
    verificationCode?: string | null;
    
    
  
    @Column({ type: 'timestamp', nullable: true })
    codeGeneratedAt?: Date;
  
    @Column({
      type: 'enum',
      enum: Role,
      default: Role.USER,
    })
    accessLevel: Role;
  
    // ✅ user — Rating entity ichidagi field
    @OneToMany(() => Rating, (rating) => rating.user)
    givenRatings: Rating[];
  
    // ✅ comment.auth yoki comment.user bo'lishi kerak
    @OneToMany(() => Comment, (comment) => comment.auth)
    writtenComments: Comment[];
  
    // ✅ like.auth yoki like.user bo'lishi kerak
    @OneToMany(() => Like, (like) => like.auth)
    reactions: Like[];
  
    // ✅ cart.user yoki cart.auth bo'lishi mumkin
    @OneToMany(() => Cart, (cart) => cart.user)
    shoppingCarts: Cart[];
  }
  