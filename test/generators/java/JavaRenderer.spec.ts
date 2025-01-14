import { JavaRenderer } from '../../../src/generators/java/JavaRenderer';
import { CommonInputModel, CommonModel } from '../../../src/models';
class MockJavaRenderer extends JavaRenderer {

}
describe('JavaRenderer', () => {
  let renderer: JavaRenderer;
  beforeEach(() => {
    renderer = new MockJavaRenderer({}, [], new CommonModel(), new CommonInputModel());
  });

  describe('renderType()', () => {
    test('Should render refs with pascal case', () => {
      const model = new CommonModel();
      model.$ref = '<anonymous-schema-1>';
      expect(renderer.renderType(model)).toEqual('AnonymousSchema_1');
    });
  });

  describe('toJavaType()', () => {
    test('Should be able to return long', () => {
      expect(renderer.toJavaType('long', new CommonModel())).toEqual('long');
      expect(renderer.toJavaType('int64', new CommonModel())).toEqual('long');
    });
    test('Should be able to return date', () => {
      expect(renderer.toJavaType('date', new CommonModel())).toEqual('java.time.LocalDate');
    });
    test('Should be able to return time', () => {
      expect(renderer.toJavaType('time', new CommonModel())).toEqual('java.time.OffsetTime');
    });
    test('Should be able to return offset date time', () => {
      expect(renderer.toJavaType('dateTime', new CommonModel())).toEqual('java.time.OffsetDateTime');
      expect(renderer.toJavaType('date-time', new CommonModel())).toEqual('java.time.OffsetDateTime');
    });
    test('Should be able to return float', () => {
      expect(renderer.toJavaType('float', new CommonModel())).toEqual('float');
    });
    test('Should be able to return byte array', () => {
      expect(renderer.toJavaType('binary', new CommonModel())).toEqual('byte[]');
    });
  });

  describe('toClassType()', () => {
    test('Should be able to return long object', () => {
      expect(renderer.toClassType('long')).toEqual('Long');
    });
    test('Should be able to return float object', () => {
      expect(renderer.toClassType('float')).toEqual('Float');
    });
  });

  describe('renderComments()', () => {
    test('Should be able to render comments', () => {
      expect(renderer.renderComments('someComment')).toEqual(`/**
 * someComment
 */`);
    });
  });

  describe('renderAnnotation()', () => {
    test('Should be able to render multiple annotations', () => {
      expect(renderer.renderAnnotation('someComment', {test: 'test2'})).toEqual('@SomeComment(test=test2)');
    });
  });
});
