import { calculateWinner } from '../utils';
import { PlayerName } from '../../enums';

describe('utils', () => {
  describe('calculateWinner', () => {
    it(`should return an empty value if the values array doesn't contain three same values in a row`, () => {
      const mockValues: PlayerName[] = [
        PlayerName.X,
        PlayerName.O,
        PlayerName.X,
        PlayerName.O,
      ];
      expect(calculateWinner(mockValues)).toBeNull();
    });

    it(`should return X if the values array contains three X values in a row`, () => {
      const mockValues: PlayerName[] = [
        PlayerName.X,
        PlayerName.O,
        PlayerName.X,
        PlayerName.X,
        PlayerName.X,
        PlayerName.X,
        PlayerName.X,
        PlayerName.O,
      ];
      expect(calculateWinner(mockValues)).toBe(PlayerName.X);
    });
  });
});
