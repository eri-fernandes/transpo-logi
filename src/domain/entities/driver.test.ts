import { Driver } from './driver';

describe('Driver', () => {
  it('deve criar um motorista corretamente', () => {
    const driver = new Driver({
      id: '1',
      name: 'João da Silva',
      licenseNumber: 'ABC123456',
    });

    expect(driver.id).toBe('1');
    expect(driver.name).toBe('João da Silva');
    expect(driver.licenseNumber).toBe('ABC123456');
  });

  it('deve permitir motoristas diferentes com licenças distintas', () => {
    const driver1 = new Driver({
      id: '1',
      name: 'João da Silva',
      licenseNumber: 'ABC123456',
    });

    const driver2 = new Driver({
      id: '2',
      name: 'Maria da Silva',
      licenseNumber: 'DEF123456',
    });

    expect(driver1.licenseNumber).not.toBe(driver2.licenseNumber);
    expect(driver1.id).not.toBe(driver2.id);
  });
});
