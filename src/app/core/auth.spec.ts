import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
    localStorage.clear(); // On nettoie le localStorage avant chaque test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve token', () => {
    const token = 'fake-jwt-token';
    service.setToken(token);
    expect(service.getToken()).toBe(token);
  });

  it('should remove token on logout', () => {
    const token = 'fake-jwt-token';
    service.setToken(token);
    service.logout();
    expect(service.getToken()).toBeNull();
  });
});
