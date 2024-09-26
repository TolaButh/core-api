import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('general_settings')
export class GeneralSettings {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'site_name', nullable: true, length: 40 })
  siteName: string | null;

  @Column('varchar', {
    name: 'cur_text',
    nullable: true,
    comment: 'currency text',
    length: 40,
  })
  curText: string | null;

  @Column('varchar', {
    name: 'cur_sym',
    nullable: true,
    comment: 'currency symbol',
    length: 40,
  })
  curSym: string | null;

  @Column('varchar', { name: 'email_from', nullable: true, length: 40 })
  emailFrom: string | null;

  @Column('text', { name: 'email_template', nullable: true })
  emailTemplate: string | null;

  @Column('varchar', { name: 'sms_body', nullable: true, length: 255 })
  smsBody: string | null;

  @Column('varchar', { name: 'sms_from', nullable: true, length: 255 })
  smsFrom: string | null;

  @Column('varchar', { name: 'base_color', nullable: true, length: 40 })
  baseColor: string | null;

  @Column('varchar', { name: 'secondary_color', nullable: true, length: 40 })
  secondaryColor: string | null;

  @Column('text', {
    name: 'mail_config',
    nullable: true,
    comment: 'email configuration',
  })
  mailConfig: string | null;

  @Column('text', { name: 'sms_config', nullable: true })
  smsConfig: string | null;

  @Column('text', { name: 'global_shortcodes', nullable: true })
  globalShortcodes: string | null;

  @Column('tinyint', {
    name: 'ev',
    comment: 'email verification, 0 - dont check, 1 - check',
    width: 1,
    default: () => "'0'",
  })
  ev: boolean;

  @Column('tinyint', {
    name: 'en',
    comment: 'email notification, 0 - dont send, 1 - send',
    width: 1,
    default: () => "'0'",
  })
  en: boolean;

  @Column('tinyint', {
    name: 'sv',
    comment: 'mobile verication, 0 - dont check, 1 - check',
    width: 1,
    default: () => "'0'",
  })
  sv: boolean;

  @Column('tinyint', {
    name: 'sn',
    comment: 'sms notification, 0 - dont send, 1 - send',
    width: 1,
    default: () => "'0'",
  })
  sn: boolean;

  @Column('tinyint', {
    name: 'ln',
    comment: 'Enable language, 0 - disable, 1 -enable\r\n',
    width: 1,
    default: () => "'0'",
  })
  ln: boolean;

  @Column('tinyint', { name: 'force_ssl', width: 1, default: () => "'0'" })
  forceSsl: boolean;

  @Column('tinyint', {
    name: 'maintenance_mode',
    width: 1,
    default: () => "'0'",
  })
  maintenanceMode: boolean;

  @Column('tinyint', {
    name: 'secure_password',
    width: 1,
    default: () => "'0'",
  })
  securePassword: boolean;

  @Column('datetime', { name: 'last_cron', nullable: true })
  lastCron: Date | null;

  @Column('tinyint', { name: 'agree', width: 1, default: () => "'0'" })
  agree: boolean;

  @Column('tinyint', {
    name: 'registration',
    comment: '0: Off\t, 1: On',
    width: 1,
    default: () => "'0'",
  })
  registration: boolean;

  @Column('varchar', { name: 'active_template', nullable: true, length: 40 })
  activeTemplate: string | null;

  @Column('text', { name: 'system_info', nullable: true })
  systemInfo: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
