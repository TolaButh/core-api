import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Index('username', ['username', 'email'], { unique: true })
@Entity('users')
export class Users {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'firstname', nullable: true, length: 40 })
  firstname: string | null;

  @Column('varchar', { name: 'lastname', nullable: true, length: 40 })
  lastname: string | null;

  @Column('varchar', { name: 'username', length: 40 })
  username: string;

  @Column('varchar', { name: 'email', length: 40 })
  email: string;

  @Column('varchar', { name: 'api_key', nullable: true, length: 191 })
  apiKey: string | null;

  @Column('varchar', { name: 'country_code', nullable: true, length: 40 })
  countryCode: string | null;

  @Column('varchar', { name: 'mobile', nullable: true, length: 40 })
  mobile: string | null;

  @Column('decimal', {
    name: 'balance',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  balance: number;

  @Column('int', { name: 'income', default: () => "'0'" })
  income: number;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('varchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('text', {
    name: 'address',
    nullable: true,
    comment: 'contains full address',
  })
  address: string | null;

  @Column('tinyint', {
    name: 'status',
    comment: '0: banned, 1: active',
    width: 1,
    default: () => "'1'",
  })
  status: boolean;

  @Column('tinyint', {
    name: 'ev',
    comment: '0: email unverified, 1: email verified',
    width: 1,
    default: () => "'0'",
  })
  ev: boolean;

  @Column('tinyint', {
    name: 'sv',
    comment: '0: mobile unverified, 1: mobile verified',
    width: 1,
    default: () => "'0'",
  })
  sv: boolean;

  @Column('tinyint', {
    name: 'profile_complete',
    width: 1,
    default: () => "'0'",
  })
  profileComplete: boolean;

  @Column('varchar', {
    name: 'ver_code',
    nullable: true,
    comment: 'stores verification code',
    length: 40,
  })
  verCode: string | null;

  @Column('datetime', {
    name: 'ver_code_send_at',
    nullable: true,
    comment: 'verification send time',
  })
  verCodeSendAt: Date | null;

  @Column('tinyint', {
    name: 'ts',
    comment: '0: 2fa off, 1: 2fa on',
    width: 1,
    default: () => "'0'",
  })
  ts: boolean;

  @Column('tinyint', {
    name: 'tv',
    comment: '0: 2fa unverified, 1: 2fa verified',
    width: 1,
    default: () => "'1'",
  })
  tv: boolean;

  @Column('varchar', { name: 'tsc', nullable: true, length: 255 })
  tsc: string | null;

  @Column('varchar', { name: 'ban_reason', nullable: true, length: 255 })
  banReason: string | null;

  @Column('varchar', { name: 'remember_token', nullable: true, length: 255 })
  rememberToken: string | null;

  @Column('int', { name: 'rank_id', default: () => '1' })
  rankId: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
