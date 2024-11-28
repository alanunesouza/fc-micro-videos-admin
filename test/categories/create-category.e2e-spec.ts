import request from 'supertest';
import { ICategoryRepository } from '../../src/core/category/domain/category.repository';
import { CATEGORY_PROVIDERS } from '../../src/nest-modules/categories-module/categories.providers';
import { CreateCategoryFixture } from 'src/nest-modules/categories-module/__tests__/category-fixture';
import { startApp } from 'src/nest-modules/shared-module/testing/helpers';
import { Uuid } from '@core/shared/domain/value-objects/uuid.vo';
import { CategoriesController } from 'src/nest-modules/categories-module/categories.controller';
import { CategoryOutputMapper } from '@core/category/application/use-cases/common/category-output';
import { instanceToPlain } from 'class-transformer';

describe('CategoriesController (e2e)', () => {
  const appHelper = startApp();
  let categoryRepo: ICategoryRepository;

  beforeEach(async () => {
    categoryRepo = appHelper.app.get<ICategoryRepository>(
      CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
  });

  describe('/categories (POST)', () => {
    describe('should create a category', () => {
      const arrange = CreateCategoryFixture.arrangeForCreate();
      test.each(arrange)(
        'when body is $send_data',
        async ({ send_data, expected }) => {
          const response = await request(appHelper.app.getHttpServer())
            .post('/categories')
            .send(send_data)
            .expect(201);

          const keysInResponse = CreateCategoryFixture.keysInResponse;
          expect(Object.keys(response.body)).toStrictEqual(['data']);
          expect(Object.keys(response.body.data)).toStrictEqual(keysInResponse);
          const id = response.body.data.id;
          const categoryCreated = await categoryRepo.findById(new Uuid(id));
          expect(categoryCreated).not.toBeNull();

          const presenter = CategoriesController.serialize(
            CategoryOutputMapper.toOutput(categoryCreated!),
          );
          const serialized = instanceToPlain(presenter);
          expect(response.body.data).toStrictEqual({
            id: serialized.id,
            created_at: serialized.created_at,
            ...expected,
          });
        },
      );
    });

    describe('should return a response error with 422 status code when request body is invalid', () => {
      const invalidRequest = CreateCategoryFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));

      test.each(arrange)('when body is $label', ({ value }) => {
        return request(appHelper.app.getHttpServer())
          .post('/categories')
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should return a response error with 422 status code when throw EntityValidationError', () => {
      const invalidRequest =
        CreateCategoryFixture.arrangeForEntityValidationError();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));

      test.each(arrange)('when body is $label', ({ value }) => {
        return request(appHelper.app.getHttpServer())
          .post('/categories')
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });
  });
});
