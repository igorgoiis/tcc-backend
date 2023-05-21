import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddForeignKeyToProcessos1619230134890
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'process',
      new TableColumn({
        name: 'user_id',
        type: 'integer',
      }),
    );

    await queryRunner.createForeignKey(
      'process',
      new TableForeignKey({
        name: 'ProcessUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('process', 'ProcessUser');
    await queryRunner.dropColumn('process', 'user_id');
  }
}
