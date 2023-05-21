import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAtividades1608416487766
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activity',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'process_id',
            type: 'integer',
          },
          {
            name: 'step_id',
            type: 'integer',
          },
          {
            name: 'item',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'valor',
            type: 'char',
          },
          {
            name: 'ordem',
            type: 'char',
          },
          {
            name: 'espacial',
            type: 'char',
          },
          {
            name: 'temporal',
            type: 'char',
          },
          {
            name: 'dinamica',
            type: 'char',
          },
          {
            name: 'plastica',
            type: 'char',
          },
          {
            name: 'cumulatividade',
            type: 'char',
          },
          {
            name: 'magnitude',
            type: 'char',
          },
          {
            name: 'significancia',
            type: 'char',
          },
          {
            name: 'sensibilidade',
            type: 'char',
          },
          {
            name: 'condicoes',
            type: 'char',
          },
          {
            name: 'resistencia',
            type: 'char',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'activity',
      new TableForeignKey({
        name: 'ActivityProcess',
        columnNames: ['process_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'process',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'activity',
      new TableForeignKey({
        name: 'ActivityStep',
        columnNames: ['step_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'step',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('activity', 'ActivityProcess');
    await queryRunner.dropForeignKey('activity', 'ActivityStep');
    await queryRunner.dropTable('activity');
  }
}
